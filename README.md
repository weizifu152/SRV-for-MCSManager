# SRV-for-MCSManager
在MCSManager启用srv
# MCSManager SRV 支持修复

本文件夹包含修复MCSManager SRV解析支持的文件。

## 修复内容

1. **frontend/src/hooks/useOverviewInfo.ts**
   - 在 `ComputedNodeInfo` 接口中添加了 `enableSRV?: boolean` 属性

2. **frontend/src/widgets/node/NodeDetailDialog.vue**
   - 在使用 `enableSRV` 属性时添加了类型断言 `(data as any).enableSRV`
   - 确保SRV配置选项在节点编辑时正确显示

## 使用方法

1. 将本文件夹中的 `frontend` 目录复制到 MCSManager 项目根目录
2. 替换相应的文件
3. 重新构建前端项目

## 功能说明

- **SRV记录支持**：在添加分布式节点时支持SRV记录解析
- **Minecraft状态检测**：支持Minecraft服务器的SRV记录解析
- **默认启用**：SRV解析默认开启，可以在节点配置中手动禁用

## 注意事项

- 确保DNS中已正确配置SRV记录
- 对于Minecraft服务器，SRV记录格式为：`_minecraft._tcp.<domain>`
- 对于Daemon节点，SRV记录格式为：`_mcsm-daemon._tcp.<domain>`
