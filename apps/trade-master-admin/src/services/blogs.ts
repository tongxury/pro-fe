import { request } from '@umijs/max';

// 获取博客列表
export async function getBlogs(
  params?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request('/api/mgmt/blogs', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addBlog(
  params?: { [key: string]: any },
) {
  return request('/api/mgmt/blogs', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 文件上传
export const uploadFile = (data: any) => {
  return request("/api/databank/pub-files", {
    method: "POST",
    data,

  });
};
// 删除
export const deleteBlog = (id:string) => {
  return request(`/api/mgmt/blogs/${id}`, {
    method: "DELETE",
  

  });
};