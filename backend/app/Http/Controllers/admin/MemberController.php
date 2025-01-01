<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\File;
use App\Models\TempImage;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $member = Member::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 'true',
            'members' => $member,
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
            'name' => 'required',
            'job_title' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fail',
                'errors' => $validator->errors(),
            ]);
        }
        $member = Member::create([
            'name' => $request->name,
            'job_title' => $request->job_title,
            'linkedin_url' => $request->linkedin_url,
            'status' => $request->status,
        ]);
        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->image);
                $ext = last($extArray);
                $fileName = strtotime('now') . $member->id . '.' . $ext;

                $sourcePath = public_path('uploads/temp/' . $tempImage->image);
                $destinationPath = public_path('uploads/members/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destinationPath);

                $destinationPath = public_path('uploads/members/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $member->image = $fileName;
                $member->save();
            }
        }
        return response()->json([
            'status' => 'true',
            'message' => "Member Added Successfully",
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $member = Member::find($id);
        if ($member == null) {
            return response()->json([
                'status' => 'fails',
                'message' => "Member not found",
            ]);
        }
        return response()->json([
            'status' => 'true',
            'data' => $member,

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
        $member = Member::find($id);
        if ($member == null) {
            return response()->json([
                'status' => 'fail',
                'message' => "Member not found",
            ]);
        }
        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job_title' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fail',
                'errors' => $validator->errors(),
            ]);
        }
        $member->name = $request->name;
        $member->linkedin_url = $request->linkedin_url;
        $member->job_title = $request->job_title;
        $member->status = $request->status;
        $member->save();
        if ($request->imageId > 0) {
            $oldImage = $member->image;
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->image);
                $ext = last($extArray);
                $fileName = strtotime('now') . $member->id . '.' . $ext;

                $sourcePath = public_path('uploads/temp/' . $tempImage->image);
                $destinationPath = public_path('uploads/members/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destinationPath);

                $destinationPath = public_path('uploads/members/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destinationPath);
                $member->image = $fileName;
                $member->save();
                if ($oldImage != '') {
                    File::delete(public_path('uploads/members/large/' . $oldImage));
                    File::delete(public_path('uploads/members/small/' . $oldImage));
                }
            }
        }
        return response()->json([
            'status' => 'true',
            'message' => "Member Updated Successfully",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $member = Member::find($id);
        if ($member == null) {
            return response()->json([
                'status' => 'fail',
                'message' => "Member not found",
            ]);
        }
        File::delete(public_path('uploads/members/large/' . $member->image));
        File::delete(public_path('uploads/members/small/' . $member->image));
        $member->delete();
        return response()->json([
            'status' => 'true',
            'message' => "Member Deleted Successfully",
        ]);
    }
}
