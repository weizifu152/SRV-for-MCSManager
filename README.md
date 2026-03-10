# MCSManager SRV 解析功能修复

本文件夹包含了 MCSManager 支持 SRV 记录解析的所有修改文件。通过将这些文件复制到对应的目录，可以实现以下功能：

## 功能说明

1. **分布式管理添加服务器时支持 SRV 记录**
   - 可以输入域名并启用 SRV 解析
   - 系统会自动解析 `_mcsm-daemon._tcp.<domain>` SRV 记录

2. **Minecraft 服务器状态检测支持 SRV**
   - 在实例的 Ping 配置中可以启用 SRV 解析
   - 系统会自动解析 `_minecraft._tcp.<domain>` SRV 记录

## 修改的文件

### Common 模块
- `common/src/srv_resolver.ts` - SRV 解析工具
- `common/src/index.ts` - 导出 SRV 解析器
- `common/global.d.ts` - 全局类型定义

### Daemon 模块
- `daemon/src/entity/commands/minecraft/mc_ping.ts` - Minecraft Ping 命令支持 SRV
- `daemon/src/entity/instance/Instance_config.ts` - 添加 enableSRV 默认配置

### Panel 模块
- `panel/src/app/entity/entity_interface.ts` - 远程服务接口类型定义
- `panel/src/app/entity/remote_service.ts` - 远程服务连接支持 SRV
- `panel/src/app/service/remote_service.ts` - 远程服务管理
- `panel/src/app/routers/daemon_router.ts` - API 路由处理

### 前端模块
- `frontend/src/widgets/node/NodeDetailDialog.vue` - 节点详情对话框添加 SRV 选项
- `frontend/src/widgets/instance/dialogs/PingConfig.vue` - Minecraft Ping 配置添加 SRV 选项
- `frontend/src/services/apis/index.ts` - API 接口类型定义
- `frontend/src/hooks/useOverviewInfo.ts` - 节点信息类型定义

### 语言文件
- `languages/zh_CN.json` - 中文翻译
- `languages/en_US.json` - 英文翻译

## 使用方法

1. **备份原有文件** - 建议在替换前备份相关文件
2. **复制文件** - 将本文件夹中的所有文件复制到 MCSManager 对应目录
3. **重启服务** - 重启 MCSManager 服务以应用更改

## SRV 记录配置示例

### Minecraft 服务器 SRV 记录
```
_minecraft._tcp.example.com. 300 IN SRV 0 5 25565 mc.example.com.
```

### MCSManager Daemon SRV 记录
```
_mcsm-daemon._tcp.daemon.example.com. 300 IN SRV 0 5 24444 daemon.example.com.
```

## 注意事项

1. **固定 IP 地址** - 当输入 IP 地址时，系统会自动识别为 IP，不会尝试 SRV 解析
2. **SRV 解析失败** - 当 SRV 解析失败时，系统会回退到使用原始域名和端口
3. **域名格式** - 请确保输入的域名格式正确，且 SRV 记录已正确配置

## 故障排查

如果遇到问题，请检查：
1. SRV 记录是否正确配置
2. 域名是否可以正常解析
3. 网络连接是否正常
4. 相关服务是否正常运行

如有其他问题，请参考 MCSManager 官方文档或社区支持。