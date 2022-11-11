import React, { useState } from "react";

import { Main } from "../components/styles/PageWrappers";

import { Overlay } from "../components/styles/Overlay";

import style from "../components/styles/form.module.css"; // css file for styling

const Edit = () => {
  return (
    <Main>
      <div className={style.form_con}>
        <Overlay />
        <form>
          <h2>Edit Post</h2>
          <p className={style.msg}></p>
          <div className={style.input_group}>
            <label htmlFor="name">Title</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className={style.input_group}>
            <label htmlFor="post">Description</label>
            <textarea name="post" id="post" />
          </div>
          <div className={style.input_group}>
            <label htmlFor="file">Select Image</label>
            <input type="file" name="file" id="file" />
          </div>
          <div className={style.submit_group}>
            <div className={`${style.spinner} ${style.hide_spinner}`}></div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </Main>
  );
};

export default Edit;
