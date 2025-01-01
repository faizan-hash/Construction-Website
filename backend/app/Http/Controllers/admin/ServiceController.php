<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\File;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 'true',
            'services' => $services,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:services,slug',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fails',
                'errors' => $validator->errors(),
            ]);
        }
        $service = Service::create([
            'title' => $request->title,
            'slug' => Str::slug($request->slug),
            'short_desc' => $request->short_desc,
            'content' => $request->content,
            'status' => $request->status,

        ]);
        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->image);
                $ext = last($extArray);
                $fileName = strtotime('now') . $service->id . '.' . $ext;

                $sourcePath = public_path('uploads/temp/' . $tempImage->image);
                $destinationPath = public_path('uploads/services/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destinationPath);

                $destinationPath = public_path('uploads/services/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $service->image = $fileName;
                $service->save();
            }
        }
        return response()->json([
            'status' => 'true',
            'message' => "Service Added Successfully",
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $service = Service::find($id);
        if ($service == null) {
            return response()->json([
                'status' => 'fails',
                'message' => "Service not found",
            ]);
        }
        return response()->json([
            'status' => 'true',
            'data' => $service,

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $service = Service::find($id);
        if ($service == null) {
            return response()->json([
                'status' => 'fails',
                'message' => "Service not found",
            ]);
        }
        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:services,slug,' . $id . ',id'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fails',
                'errors' => $validator->errors(),
            ]);
        }
        $service->title = $request->title;
        $service->slug = $request->slug;
        $service->short_desc = $request->short_desc;
        $service->content = $request->content;
        $service->status = $request->status;
        $service->save();
        if ($request->imageId > 0) {
            $oldImage = $service->image;
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->image);
                $ext = last($extArray);
                $fileName = strtotime('now') . $service->id . '.' . $ext;

                $sourcePath = public_path('uploads/temp/' . $tempImage->image);
                $destinationPath = public_path('uploads/services/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destinationPath);

                $destinationPath = public_path('uploads/services/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $service->image = $fileName;
                $service->save();
                if ($oldImage != '') {
                    File::delete(public_path('uploads/services/large/' . $oldImage));
                    File::delete(public_path('uploads/services/small/' . $oldImage));
                }
            }
        }

        return response()->json([
            'status' => 'true',
            'message' => "Service Updated Successfully",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $service = Service::find($id);
        if ($service == null) {
            return response()->json([
                'status' => 'fails',
                'message' => "Service not found",
            ]);
        }
        File::delete(public_path('uploads/projects/large/' . $service->image));
        File::delete(public_path('uploads/projects/small/' . $service->image));
        $service->delete();
        return response()->json([
            'status' => 'true',
            'message' => "Service Deleted Successfully",
        ]);
    }
}
