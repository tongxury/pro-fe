# FavoriteButton Component

一个通用的收藏按钮组件，使用方式类似标准表单组件（value + onChange）。

## 特性

- ✅ **简洁的API**: 只需要 `value` 和 `onChange` 两个核心props
- ✅ **自动加载状态**: 组件内部自动管理loading状态
- ✅ **通用性**: 可用于任何需要收藏功能的资源
- ✅ **自定义**: 支持自定义提示文本、成功消息和错误消息
- ✅ **动画效果**: 平滑的星星动画过渡效果
- ✅ **异步支持**: 自动处理Promise返回值

## Props

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `value` | `boolean` | ❌ | `false` | 当前收藏状态 |
| `onChange` | `(value: boolean) => Promise<any> \| void` | ❌ | - | 点击时的回调函数，接收新的状态值 |
| `tooltip` | `{ favorite?: string; unfavorite?: string }` | ❌ | `{ favorite: '取消收藏', unfavorite: '收藏' }` | 自定义提示文本 |
| `successMessage` | `{ favorite?: string; unfavorite?: string }` | ❌ | `{ favorite: '已收藏', unfavorite: '已取消收藏' }` | 自定义成功消息 |
| `errorMessage` | `string` | ❌ | `'操作失败'` | 自定义错误消息 |

## 使用示例

### 示例 1: 基础用法 - 收藏 Asset

```tsx
import FavoriteButton from "@/components/FavoriteButton";
import { favorateAsset } from "@/api/asset";
import { useRequest } from "ahooks";

const MyComponent = () => {
    const { data, run } = useRequest(() => getAsset({ id: assetId }));
    
    return (
        <FavoriteButton 
            value={data?.favorite} 
            onChange={async (newValue) => {
                await favorateAsset({ id: assetId });
                run(); // 刷新数据
            }} 
        />
    );
};
```

### 示例 2: 使用受控状态

```tsx
import FavoriteButton from "@/components/FavoriteButton";
import { useState } from "react";

const MyComponent = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    
    return (
        <FavoriteButton 
            value={isFavorite} 
            onChange={async (newValue) => {
                // 调用API
                await favoriteAPI({ id: itemId });
                // 更新本地状态
                setIsFavorite(newValue);
            }} 
        />
    );
};
```

### 示例 3: 自定义文本和消息

```tsx
import FavoriteButton from "@/components/FavoriteButton";

<FavoriteButton 
    value={item.favorite} 
    onChange={async (newValue) => {
        await toggleFavorite({ id: item.id });
    }}
    tooltip={{
        favorite: '取消喜欢',
        unfavorite: '喜欢'
    }}
    successMessage={{
        favorite: '已添加到我的收藏',
        unfavorite: '已从收藏中移除'
    }}
    errorMessage="收藏操作失败，请重试"
/>
```

### 示例 4: 无异步操作

```tsx
import FavoriteButton from "@/components/FavoriteButton";

<FavoriteButton 
    value={localFavorite} 
    onChange={(newValue) => {
        // 仅更新本地状态，不调用API
        setLocalFavorite(newValue);
    }} 
/>
```

## 工作原理

1. 点击按钮时，组件自动进入loading状态
2. 调用 `onChange(newValue)` 回调函数
3. 如果返回值是 Promise，等待其完成
4. 成功后显示成功消息，失败则显示错误消息
5. 自动退出loading状态

## 设计理念

组件设计遵循React表单组件的设计模式：
- **value**: 表示当前状态（类似 `<input value={...} />`）
- **onChange**: 状态变化时的回调（类似 `<input onChange={...} />`）

这种设计让组件使用起来更加直观和简洁。
