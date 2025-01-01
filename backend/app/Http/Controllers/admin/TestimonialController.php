<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\File;
use App\Models\TempImage;

class testimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testimonial = testimonial::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 'true',
            'testimonial' => $testimonial,
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
        $validator = Validator::make($request->all(), [
            'citation' => 'required',
            'testimonial' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fail',
                'errors' => $validator->errors(),
            ]);
        }
        $testimonial = testimonial::create([

            'citation' => $request->citation,
            'testimonial' => $request->testimonial,
            'status' => $request->status,
            'desigination' => $request->desigination,

        ]);
        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->image);
                $ext = last($extArray);
                $fileName = strtotime('now') . $testimonial->id . '.' . $ext;

                $sourcePath = public_path('uploads/temp/' . $tempImage->image);
                $destinationPath = public_path('uploads/testimonials/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destinationPath);

                $destinationPath = public_path('uploads/testimonials/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $testimonial->image = $fileName;
                $testimonial->save();
            }
        }
        return response()->json([
            'status' => 'true',
            'message' => "testimonial Added Successfully",
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $testimonial = testimonial::find($id);
        if ($testimonial == null) {
            return response()->json([
                'status' => 'fail',
                'message' => "testimonial not found",
            ]);
        }
        return response()->json([
            'status' => 'true',
            'data' => $testimonial,

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
        $testimonial = testimonial::find($id);
        if ($testimonial == null) {
            return response()->json([
                'status' => 'fail',
                'message' => "testimonial not found",
            ]);
        }
        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'citation' => 'required',
            'testimonial' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fail',
                'errors' => $validator->errors(),
            ]);
        }
        $testimonial->testimonial = $request->testimonial;
        $testimonial->citation = $request->citation;
        $testimonial->status = $request->status;
        $testimonial->desigination = $request->desigination;
        $testimonial->save();
        if ($request->imageId > 0) {
            $oldImage = $testimonial->image;
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->image);
                $ext = last($extArray);
                $fileName = strtotime('now') . $testimonial->id . '.' . $ext;

                $sourcePath = public_path('uploads/temp/' . $tempImage->image);
                $destinationPath = public_path('uploads/testimonials/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destinationPath);

                $destinationPath = public_path('uploads/testimonials/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $testimonial->image = $fileName;
                $testimonial->save();
                if ($oldImage != '') {
                    File::delete(public_path('uploads/testimonials/large/' . $oldImage));
                    File::delete(public_path('uploads/testimonials/small/' . $oldImage));
                }
            }
        }
        return response()->json([
            'status' => 'true',
            'message' => "testimonial Updated Successfully",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $testimonial = testimonial::find($id);
        if ($testimonial == null) {
            return response()->json([
                'status' => 'fail',
                'message' => "testimonial not found",
            ]);
        }
        File::delete(public_path('uploads/testimonials/large/' . $testimonial->image));
        File::delete(public_path('uploads/testimonials/small/' . $testimonial->image));
        $testimonial->delete();
        return response()->json([
            'status' => 'true',
            'message' => "testimonial Deleted Successfully",
        ]);
    }
}
