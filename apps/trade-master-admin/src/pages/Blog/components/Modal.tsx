import { useState, useMemo, useRef, useImperativeHandle,forwardRef } from "react";
import ReactQuill, { Quill } from "react-quill";
// import { debounce } from "lodash";
import useRichTextUploadPicture from './useReplaced'
import "./Modal.css";
import imageResize from 'quill-image-resize-module-react'
Quill.register('modules/imageResize', imageResize)
let fontSizeArr = [
	'12px', '13px', '14px', '15px', '16px',
	'17px', '18px', '19px', '20px', '21px',
	'22px', '23px', '24px', '25px', '26px',
	'27px', '28px', '29px', '30px', '31px',
	'32px', '33px', '34px', '35px', '36px',
	'37px', '38px', '39px', '40px', '41px',
	'42px', '43px', '44px', '45px', '46px',
	'47px', '48px', '49px', '50px', '51px',
	'52px', '53px', '54px', '55px', '56px',
	'57px', '58px', '59px', '60px', '61px',
	'62px', '63px', '64px', '65px', '66px',
	'67px', '68px', '69px', '70px', 
]
let SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = fontSizeArr;
Quill.register(SizeStyle, true);

let fontFamily = ['宋体', '黑体', '微软雅黑', '楷体', '仿宋', '苹方','华文仿宋','华文楷体','Inter','Arial','Tahoma','Verdana','Times New Roman','Courier New','EB Garamond'];
let fontFamilyStyle = Quill.import('attributors/style/font');
fontFamilyStyle.whitelist = fontFamily
Quill.register(fontFamilyStyle,true);

const ReactQuillEditor = forwardRef((props: any,ref:any) => {
	const { readOnly, changeValue } = props;
	const [value, setValue] = useState("");
	const [replacedValue,setReplacedValue] = useRichTextUploadPicture(value)
	const quillRef = useRef(null);
	// 富文本编辑配置
	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					['bold', 'italic', 'underline', 'strike'],        // toggled buttons
					['blockquote', 'code-block'],
					['link', 'image', 'video', 'formula'],
		
					[{ 'header': 1 }, { 'header': 2 }],               // custom button values
					[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
					[{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
					[{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
					[{ 'direction': 'rtl' }],                         // text direction
		
					// [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
					[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
		
					[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
					[{'size': fontSizeArr}],
					[{ 'font': fontFamily }],
					[{ 'align': [] }],
					// [{ 'size': [{first:"11px"},{second:'12px'}] }],  
					// [{ font: ['Arial','times','Raleway']}],
					['clean'],
					
				],
				handlers: {
					'image': (image:any) => {
						const input = document.createElement('input');
						input.setAttribute('type', 'file');
						input.setAttribute('accept', 'image/*');
						input.click();
						console.log(11111111111, image);
						input.onchange = async () => {
							if (input.files) {
								const file = input.files[0];
								// 检查文件类型
								if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
									alert('只能上传 JPEG、PNG 或 GIF 格式的图片');
									return;
								}

								const formData = new FormData();
								formData.append('files', file);
								console.log(formData, 'formDataformData', input.files[0]);

								try {
									const response = await fetch(`${process.env.API_URL}/api/databank/pub-files`, {
										method: 'POST',
										body: formData,
									});
									const data = await response.json();
									const imageUrl = data.data?.files[0]?.url || '';
									// 将图片 URL 插入到编辑器中
									//@ts-ignore
									const quill = quillRef.current.getEditor();
									const range = quill.getSelection();
									const index = range ? range.index : 0;
									quill.insertEmbed(index, 'image', imageUrl);
									//@ts-ignore
									// const img = quillRef.current.editor.container.querySelector('img[src="' + imageUrl + '"]');
									// if (img) {
									//   img.style.maxWidth = '300px'; // 设置图片最大宽度
									//   img.style.height = 'auto'; // 设置图片高度自动适应宽度
									// }
								} catch (error) {
									console.error('上传图片失败', error);
								}
							}
						};
					}, // 自定义图片上传

				},
			},
			imageResize: {
				// 调整图片尺寸
				displayStyles: {
				  border: 'none',
				},
				modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
			},
		}),
		[],
	);

	// 剩下参数 delta: DeltaStatic, source: Sources, editor: ReactQuill.UnprivilegedEditor
	const handleChangeValue = (value: string) => {
		setValue(value);
		changeValue(value)
		setReplacedValue(value)
		//console.log(replacedValue)
	}
	useImperativeHandle(ref, () => {
		return {
			resetValue: () => {
				setReplacedValue('')
			},
			setValue: (val:any) => {
				setReplacedValue(val)
			}
        }
    })
	return (
		<div className="react-quill-wrap">
			{/* <h2 className="title">富文本编辑器</h2> */}
			<div className="quill-editor-wrap">
				{/* 自定义的工具栏 */}
				{/* <div className="quill-editor-toolbar" id="rq-toolbar">
					<button className="ql-bold">s</button>
					<button className="ql-italic">s</button>
				</div> */}
				<ReactQuill theme="snow" ref={quillRef} modules={modules} readOnly={readOnly} value={replacedValue} onChange={handleChangeValue} className="custom-quill" />
			</div>
		</div>
	);
});

export default ReactQuillEditor;

