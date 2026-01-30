import { useEffect, useState } from 'react';
import { message } from 'antd';
import {v4 as uuidV4} from 'uuid';

// base64 转换 blob
function dataURLtoBlob(dataurl:any) {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const useRichTextUploadPicture = (value:any) => {
  const [replaceValue, setReplaceValue] = useState<any>('');
  const [imgUrls, setImgUrls] = useState<any>({}); // 记录富文本的图片

  useEffect(() => {
    if (!replaceValue) return;
    // content 是要替换的字符串
    const match = replaceValue.match(/<img [^>]*src=['"]data:image([^'"]+)[^>]*>/gi)
    if (match) {
      const newContent = replaceValue.replace(
        /<img [^>]*src=['"]data:image([^'"]+)[^>]*>/gi,
        (match:any, capture:any) => {
          const id = uuidV4();
          const base64Url = match.substring(10, match.length - 2);
          imgUrls[id] = { id, base64Url };
          setImgUrls({ ...imgUrls });
          return '<img src="' + id + '"/>';
        }
      );
      setReplaceValue(newContent)
    }
  }, [replaceValue, imgUrls]);

  // 上传图片成功后进行替换
  useEffect(() => {
    const ids = Object.keys(imgUrls);
    if (!ids.length) return;
    ids.forEach(id => {
      if (imgUrls[id]?.value && !imgUrls[id]?.base64Url) {
        setReplaceValue(replaceValue.replace(id, imgUrls[id].value));
      }
    });
  }, [imgUrls]);

  // 进行图片上传
  useEffect(() => {
    const ids = Object.keys(imgUrls);
    if (!ids.length) return;
    try {
      ids.forEach(async id => {
        if (imgUrls[id]?.base64Url) {
          var formData = new FormData();
          const fileImg = dataURLtoBlob(imgUrls[id]?.base64Url);
          //改造start
          formData.append('files', fileImg);

          try {
            const response = await fetch(`${process.env.API_URL}/api/databank/pub-files`, {
              method: 'POST',
              body: formData,
            });
            const data = await response.json();
            const imageUrl = data.data?.files[0]?.url || '';
            imgUrls[id].value = imageUrl;
            imgUrls[id].base64Url = undefined;
            setImgUrls({ ...imgUrls });


            // uploadImage('image/upload', formData, data => {
            //   if (data.status === 200) {
            //     imgUrls[id].value = data.result[0];
            //     imgUrls[id].base64Url = undefined;
            //     setImgUrls({ ...imgUrls });
            //   } else {
            //     message.error('上传图片失败');
            //   }
            // });
          } catch (e) {
            console.log(e);
            message.error('上传图片失败');
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, [imgUrls]);

  return [replaceValue, setReplaceValue];
};

export default useRichTextUploadPicture;

