import { dbService } from "@/config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useRef, useState } from "react";
import Image from "next/image";
import baseImg from "../../public/images/test1.png";
import { ToastContainer } from "react-toastify";
import useGetCommunityComment from "@/hooks/useGetCommunityComment";
import { toastAlert } from "../toastify/Alert";
import Link from "next/link";

const Comments = ({ boardId, uid }) => {
  const [editComment, setEditComment] = useState("");
  const [targetIndex, setTargetIndex] = useState("");
  const [targetIsEdit, setTargetIsEdit] = useState("");
  const commentRef = useRef("");

  const { boardComments, comment, setComment, setReloadState } =
    useGetCommunityComment(boardId);

  // 댓글 add
  const addComment = async (event) => {
    event.preventDefault();
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let dateString = year + "-" + month + "-" + day;
    //댓글 공백, 빈칸 유효성 검사
    if (!comment || !comment.trim().length) {
      toastAlert("😥 댓글이 입력되지 않았어요 ");
      commentRef.current?.focus();
      return false;
    }

    const newComment = {
      uid,
      boardId,
      comment,
      writtenDate: dateString,
      ordeyByDate: new Date(),
    };
    await addDoc(collection(dbService, "comments"), newComment);
    setReloadState("댓글 저장완료");
    toastAlert("🎉 댓글 저장 성공!");
  };

  // 댓글 delete
  const deleteComment = async (id) => {
    const userConfirm = window.confirm("해당 댓글을 정말 삭제하시겠습니까?");
    if (userConfirm) {
      try {
        await deleteDoc(doc(dbService, "comments", id));
        setReloadState("댓글삭제");
        toastAlert("🗑 댓글이 삭제되었습니다");
      } catch (error) {
        alert(error);
      }
    }
  };

  const commentEdit = async (id, index, event) => {
    setTargetIndex(index);
    setTargetIsEdit(index);
    const postRef = doc(dbService, "comments", id);
    if (event.target.innerText == "완료") {
      if (editComment) {
        await updateDoc(postRef, {
          comment: editComment,
        });
        setReloadState("댓글 수정완료");
        toastAlert("🎉 댓글 수정 완료!");
        setTargetIsEdit(!index);
        setTargetIndex(!index);
      }
    }
  };

  return (
    <div>
      <div>
        <ToastContainer position="top-right" autoClose={1000} />
        <div>
          <div className="flex space-x-2 items-center">
            <h3 className="sm:text-xl text-lg">댓글</h3>
            <b className="text-[#FF0000]">{boardComments.length}</b>
          </div>

          <div>
            <div>
              {boardComments?.map((item, index) => {
                return (
                  <div key={index}>
                    {/* targetIndex === index : 수정 input열리는 부분 */}
                    {targetIndex === index ? (
                      <div>
                        {item.commentProfile == "null" ? (
                          <Image
                            className="w-[40px] h-[40px] object-cover object-center float-left m-2 rounded-md"
                            src={baseImg}
                            width={780}
                            height={270}
                            alt="대표 이미지가 없습니다."
                          />
                        ) : (
                          <Image
                            className="w-[40px] h-[40px] object-cover object-center float-left m-2 rounded-md"
                            src={item.commentProfile}
                            loader={({ src }) => src}
                            width={780}
                            height={270}
                            alt="대표 이미지가 없습니다."
                          />
                        )}
                        <h3 className="text-[12px] pt-1">
                          {item.commentWriterNickName}
                        </h3>
                        <input
                          placeholder="수정할 댓글을 작성해주세요"
                          className="p-2 text-[12px] border border-mono80 w-[320px] rounded-[2px]"
                          key={index}
                          type="text"
                          value={editComment}
                          onChange={(e) => {
                            setEditComment(e.target.value);
                          }}
                        />
                      </div>
                    ) : (
                      <div>
                        {item.commentProfile === "null" ? (
                          <Image
                            className="w-[40px] h-[40px] object-cover object-center float-left m-2 rounded-md"
                            src={baseImg}
                            width={780}
                            height={270}
                            alt="대표 이미지가 없습니다."
                          />
                        ) : (
                          <Image
                            className="w-[40px] h-[40px] object-cover object-center float-left m-2 rounded-md"
                            src={item.commentProfile}
                            loader={({ src }) => src}
                            width={780}
                            height={270}
                            alt="대표 이미지가 없습니다."
                          />
                        )}
                        <div>
                          <span className="text-[12px]">
                            {item.commentWriterNickName}
                          </span>
                          <span className="ml-2 text-mono80 text-[12px]">
                            {item.writtenDate}
                          </span>
                          <p className="ml-2 text-mono80 text-[12px]">
                            {item.comment}
                          </p>
                        </div>
                      </div>
                    )}
                    {uid === item.uid ? (
                      <div className="flex justify-end mb-1">
                        <button
                          className="text-[12px] text-mono80"
                          type="button"
                          onClick={() => {
                            deleteComment(item.id);
                          }}
                        >
                          삭제
                        </button>
                        <button
                          className="text-[12px] ml-1 mr-1 text-mono80"
                          type="button"
                          onClick={(event) => {
                            setEditComment(item.comment);
                            // 댓글 id
                            commentEdit(item.id, index, event);
                          }}
                        >
                          {targetIsEdit === index ? "완료 " : "수정"}
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end mb-1 h-5"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {uid === "guest" ? (
          <div className="w-full flex text-center mt-5 justify-evenly sm:space-x-3">
            <input
              disabled
              // className="h-[90px] w-5/6 border-[2px] border-brand100"
              className="border-mono70 border rounded-[2px] sm:h-[90px] h-[40px] w-[80%] p-3 focus:outline-none placeholder:text-xs sm:placeholder:text-base"
              type="text"
              placeholder=" 로그인 후 댓글 작성해주세요."
            />
            <Link
              className="flex justify-center items-center rounded-sm text-center text-white border-none bg-brand100 sm:h-[90px] h-[40px] sm:w-[20%] cursor-pointer focus:outline-none ring-offset-2 hover:ring-2 ring-brand100"
              href="/login"
            >
              <span className="px-2 text-sm sm:text-base">로그인</span>
            </Link>
          </div>
        ) : (
          <div className="w-full flex text-center mt-5 justify-evenly sm:space-x-3">
            <input
              ref={commentRef}
              className="border-mono70 border rounded-[2px] sm:h-[90px] h-[40px] w-[80%] p-3 focus:outline-none placeholder:text-xs sm:placeholder:text-base"
              placeholder="타쿠의식탁 커뮤니티가 훈훈해지는 댓글을 남겨주세요."
              type="text"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <div
              className="flex justify-center items-center rounded-sm text-center text-white border-none bg-brand100 sm:h-[90px] h-[40px] sm:w-[20%] cursor-pointer focus:outline-none ring-offset-2 hover:ring-2 ring-brand100"
              onClick={addComment}
            >
              <span className="px-2 text-sm sm:text-base">등록</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
