"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextAreaProps {
  value: string;
  onChange?: (value: string) => void;
}

export const RichTextArea = ({ value, onChange }: RichTextAreaProps) => {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
};
