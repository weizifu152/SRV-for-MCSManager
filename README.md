# MCSManager 修复文件

本文件夹包含了修复 MCSManager 编译错误的文件。通过将这些文件复制到对应的目录，可以解决以下编译错误：

## 修复的错误

1. **`dockerOptional` 属性缺失** - 在 `IQuickStartPackages` 接口中添加了该属性
2. **`updateCommandImage` 属性缺失** - 在 `IGlobalInstanceDockerConfig` 接口中添加了该属性
3. **`sidebarPosition` 属性缺失** - 在 `IPageLayoutConfig` 接口的 `theme` 对象中添加了该属性

## 修改的文件

### Common 模块
- `common/global.d.ts` - 更新了接口定义，添加了缺失的属性

### Panel 模块
- `panel/src/app/service/frontend_layout.ts` - 在默认布局配置中添加了 `sidebarPosition` 属性

## 使用方法

1. **备份原有文件** - 建议在替换前备份相关文件
2. **复制文件** - 将本文件夹中的所有文件复制到 MCSManager 对应目录
3. **重启服务** - 重启 MCSManager 服务以应用更改

这样就可以解决编译错误，使 MCSManager 正常运行。