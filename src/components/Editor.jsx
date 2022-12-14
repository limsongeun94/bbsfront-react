import ReactQuill from "react-quill";
import { request } from "src/libs/request";
import { useRef, useMemo } from "react";
import "react-quill/dist/quill.snow.css";

const Editor = (props) => {
  const { value, onChange } = props;
  const ref = useRef();

  const imageUploadHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", () => {
      const file = input.files[0];
      const form = new FormData();
      form.append("upload", file);

      request
        .post("/media/upload", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // callback(res.data.url, res.data.fileName)
          const editor = ref.current.getEditor(); // 에디터 객체 가져오기
          // 1. 에디터 root의 innerHTML을 수정해주기
          // editor의 root는 에디터 컨텐츠들이 담겨있다. 거기에 img태그를 추가해준다.
          // 이미지를 업로드하면 -> 멀터에서 이미지 경로 URL을 받아와 -> 이미지 요소로 만들어 에디터 안에 넣어준다.
          // editor.root.innerHTML =
          //   editor.root.innerHTML + `<img src=${IMG_URL} /><br/>` // 현재 있는 내용들 뒤에 써줘야한다.

          // 2. 현재 에디터 커서 위치값을 가져온다
          const range = editor.getSelection();
          // 가져온 위치에 이미지를 삽입한다
          editor.insertEmbed(range.index, "image", res.data.url);
        });
    });
  };
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          //[{ 'font': [] }],
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
          ["clean"],
        ],
        handlers: {
          image: imageUploadHandler,
        },
      },
    };
  }, []);

  const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  return (
    <ReactQuill
      ref={ref}
      style={null}
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={(context, delta, source, editor) => {
        onChange(editor.getHTML());
      }}
    />
  );
};

export default Editor;
