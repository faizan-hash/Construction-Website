<?php

namespace App\Http\Controllers\admin;

use App\Models\Project;
use App\Models\TempImage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 'true',
            'projects' => $projects,
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
            'slug' => 'required|unique:projects,slug',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fail',
                'errors' => $validator->errors(),
            ]);
        }
        $project = Project::create([
            'title' => $request->title,
            'slug' => Str::slug($request->slug),
            'short_desc' => $request->short_desc,
            'content' => $request->content,
            'construction_type' => $request->construction_type,
            'sector' => $request->sector,
            'location' => $request->location,
            'status' => $request->status,
        ]);
        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->image);
                $ext = last($extArray);
                $fileName = strtotime('now') . $project->id . '.' . $ext;

                $sourcePath = public_path('uploads/temp/' . $tempImage->image);
                $destinationPath = public_path('uploads/projects/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destinationPath);

                $destinationPath = public_path('uploads/projects/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $project->image = $fileName;
                $project->save();
            }
        }
        return response()->json([
            'status' => 'true',
            'message' => "Projects Added Successfully",
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $project = Project::find($id);
        if ($project == null) {
            return response()->json([
                'status' => 'fails',
                'message' => "Service not found",
            ]);
        }
        return response()->json([
            'status' => 'true',
            'data' => $project,

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
        $project = Project::find($id);
        if ($project == null) {
            return response()->json([
                'status' => 'fail',
                'message' => "Project not found",
            ]);
        }
        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug,' . $id . ',id'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fail',
                'errors' => $validator->errors(),
            ]);
        }
        $project->title = $request->title;
        $project->slug = $request->slug;
        $project->short_desc = $request->short_desc;
        $project->content = $request->content;
        $project->location = $request->location;
        $project->sector = $request->sector;
        $project->construction_type = $request->construction_type;
        $project->status = $request->status;
        $project->save();
        if ($request->imageId > 0) {
            $oldImage = $project->image;
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->image);
                $ext = last($extArray);
                $fileName = strtotime('now') . $project->id . '.' . $ext;

                $sourcePath = public_path('uploads/temp/' . $tempImage->image);
                $destinationPath = public_path('uploads/projects/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destinationPath);

                $destinationPath = public_path('uploads/projects/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $project->image = $fileName;
                $project->save();
                if ($oldImage != '') {
                    File::delete(public_path('uploads/projects/large/' . $oldImage));
                    File::delete(public_path('uploads/projects/small/' . $oldImage));
                }
            }
        }
        return response()->json([
            'status' => 'true',
            'message' => "Projects Updated Successfully",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $project = Project::find($id);
        if ($project == null) {
            return response()->json([
                'status' => 'fail',
                'message' => "project not found",
            ]);
        }
        File::delete(public_path('uploads/projects/large/' . $project->image));
        File::delete(public_path('uploads/projects/small/' . $project->image));
        $project->delete();
        return response()->json([
            'status' => 'true',
            'message' => "project Deleted Successfully",
        ]);
    }
}
