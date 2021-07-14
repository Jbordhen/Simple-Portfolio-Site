<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        // dd($request->query('minimized', null));
        // dd($request->user);
        $request->query('minimized', null) ?
            $data = User::find($request->user)
            : $data = User::with('educations', 'workExperiences', 'references', 'skills', 'projects')->where('id', $request->user)->first();
        return response($data, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255|min:3',
            'password' => 'string|min:6|nullable',
            "about" => 'string|max:500|nullable',
            'dob' => 'date',
            'portfolio_link' => 'url|nullable',
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $user = User::find(auth()->user()->id);
        $user->name = $request->name ?? $user->name;
        $user->about = $request->about ?? $user->about;
        $user->password = $request->password != null ? Hash::make($request->password) : $user->password;
        $user->dob = $request->dob ?? $user->dob;
        $user->portfolio_link = $request->portfolio_link ?? $user->portfolio_link;
        $user->update();

        return response($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
