import React, { useState } from "react";
import Comment from "../components/Comment";

export const commentData = [
  {
    name: "Priyanshu",
    text: "This is my youtube clone nested comment section",
    replies: [
      {
        name: "Priyanshu",
        text: "This is my youtube clone nested comment section",
        replies: [
          {
            name: "Priyanshu",
            text: "This is my youtube clone nested comment section",
            replies: [
              {
                name: "Priyanshu",
                text: "This is my youtube clone nested comment section",
                replies: [
                  {
                    name: "Priyanshu",
                    text: "This is my youtube clone nested comment section",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Priyanshu",
    text: "This is my youtube clone nested comment section",
    replies: [],
  },
  {
    name: "Priyanshu",
    text: "This is my youtube clone nested comment section",
    replies: [
      {
        name: "Priyanshu",
        text: "This is my youtube clone nested comment section",
        replies: [
          {
            name: "Priyanshu",
            text: "This is my youtube clone nested comment section",
            replies: [
              {
                name: "Priyanshu",
                text: "This is my youtube clone nested comment section",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Priyanshu",
    text: "This is my youtube clone nested comment section",
    replies: [],
  },
  {
    name: "Priyanshu",
    text: "This is my youtube clone nested comment section",
    replies: [
      {
        name: "Priyanshu",
        text: "This is my youtube clone nested comment section",
        replies: [],
      },
    ],
  },
  {
    name: "Priyanshu",
    text: "This is my youtube clone nested comment section",
    replies: [],
  },
];

const CommentList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div key={index} className="">
      <Comment key={index} data={comment} />
      <div className="pl-2 ml-2 md:ml-5 border-l-2 border-gray-300 ">
        <CommentList comments={comment.replies} />
      </div>
    </div>
  ));
};

export default CommentList;
