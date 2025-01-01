<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\File;
use App\Models\TempImage;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 'true',
            'articles' => $articles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:articles,slug',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fail',
                'errors' => $validator->errors(),
            ]);
        }
        $artilcle = Article::create([
            'title' => $request->title,
            'slug' => Str::slug($request->slug),
            'content' => $request->content,
            'author' => $request->author,
            'status' => $request->status,
        ]);
        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->image);
                $ext = last($extArray);
                $fileName = strtotime('now') . $artilcle->id . '.' . $ext;

                $sourcePath = public_path('uploads/temp/' . $tempImage->image);
                $destinationPath = public_path('uploads/articles/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destinationPath);

                $destinationPath = public_path('uploads/articles/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $artilcle->image = $fileName;
                $artilcle->save();
            }
        }
        return response()->json([
            'status' => 'true',
            'message' => "Articles Added Successfully",
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $article = Article::find($id);
        if ($article == null) {
            return response()->json([
                'status' => 'fails',
                'message' => "Article not found",
            ]);
        }
        return response()->json([
            'status' => 'true',
            'data' => $article,

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $article = Article::find($id);
        if ($article == null) {
            return response()->json([
                'status' => 'fail',
                'message' => "Article not found",
            ]);
        }
        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:articles,slug,' . $id . ',id'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fail',
                'errors' => $validator->errors(),
            ]);
        }
        $article->title = $request->title;
        $article->slug = $request->slug;
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;
        $article->save();
        if ($request->imageId > 0) {
            $oldImage = $article->image;
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->image);
                $ext = last($extArray);
                $fileName = strtotime('now') . $article->id . '.' . $ext;

                $sourcePath = public_path('uploads/temp/' . $tempImage->image);
                $destinationPath = public_path('uploads/articles/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destinationPath);

                $destinationPath = public_path('uploads/articles/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $article->image = $fileName;
                $article->save();
                if ($oldImage != '') {
                    File::delete(public_path('uploads/articles/large/' . $oldImage));
                    File::delete(public_path('uploads/articles/small/' . $oldImage));
                }
            }
        }
        return response()->json([
            'status' => 'true',
            'message' => "Article Updated Successfully",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $article = Article::find($id);
        if ($article == null) {
            return response()->json([
                'status' => 'fail',
                'message' => "Article not found",
            ]);
        }
        File::delete(public_path('uploads/articles/large/' . $article->image));
        File::delete(public_path('uploads/articles/small/' . $article->image));
        $article->delete();
        return response()->json([
            'status' => 'true',
            'message' => "Article Deleted Successfully",
        ]);
    }
}
