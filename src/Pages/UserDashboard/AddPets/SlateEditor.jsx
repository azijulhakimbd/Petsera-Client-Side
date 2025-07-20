// import React, { useMemo } from "react";
// import { Slate, Editable, withReact } from "slate-react";
// import { createEditor } from "slate";

// const SlateEditor = ({ value, onChange }) => {
//   const editor = useMemo(() => withReact(createEditor()), []);

//   const safeValue = useMemo(() => {
//     if (
//       Array.isArray(value) &&
//       value.length > 0 &&
//       typeof value[0] === "object" &&
//       value[0] !== null &&
//       "type" in value[0] &&
//       "children" in value[0]
//     ) {
//       return value;
//     }
//     return [{ type: "paragraph", children: [{ text: "" }] }];
//   }, [value]);

//   return (
//     <Slate editor={editor} value={safeValue} onChange={onChange}>
//       <Editable placeholder="Write description here..." />
//     </Slate>
//   );
// };

// export default SlateEditor;
