# MCSManager SRV 支持修复

本文件夹包含修复 MCSManager SRV 解析支持的文件。

## 修复内容

1. **frontend/src/hooks/useOverviewInfo.ts**

   - 在 `ComputedNodeInfo` 接口中添加了 `enableSRV?: boolean` 属性

2. **frontend/src/widgets/node/NodeDetailDialog.vue**

   - 在使用 `enableSRV` 属性时添加了类型断言 `(data as any).enableSRV`
   - 确保 SRV 配置选项在节点编辑时正确显示

3. **frontend/src/services/apis/index.ts**

   - 在 `editNode` 和 `addNode` API 接口中添加了 `enableSRV?: boolean` 参数

4. **frontend/src/widgets/instance/dialogs/PingConfig.vue**
   - 添加了 SRV 配置选项，用于 Minecraft 服务器状态检测

## 使用方法

1. 将本文件夹中的 `frontend` 目录复制到 MCSManager 项目根目录
2. 替换相应的文件
3. 重新构建前端项目

## 功能说明

- **SRV 记录支持**：在添加分布式节点时支持 SRV 记录解析
- **Minecraft 状态检测**：支持 Minecraft 服务器的 SRV 记录解析
- **默认启用**：SRV 解析默认开启，可以在节点配置中手动禁用

## 注意事项

- 确保 DNS 中已正确配置 SRV 记录
- 对于 Minecraft 服务器，SRV 记录格式为：`_minecraft._tcp.<domain>`
- 对于 Daemon 节点，SRV 记录格式为：`_mcsm-daemon._tcp.<domain>`
