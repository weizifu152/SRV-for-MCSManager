import Instance from "../../instance/instance";
import InstanceCommand from "../base/command";
import { MCServerStatus, toNumber, resolveAddressWithSRV } from "mcsmanager-common";

export default class PingJavaMinecraftServerCommand extends InstanceCommand {
  constructor() {
    super("PingJavaMinecraftServerCommand");
  }

  async exec(instance: Instance) {
    let host = instance.config.pingConfig.ip || "localhost";
    let port = instance.config.pingConfig.port;

    try {
      if (port) {
        // Try to resolve SRV record if enabled (default: true)
        const enableSRV = instance.config.pingConfig.enableSRV !== false;
        console.log(`[Minecraft Ping] Connecting to: ${host}:${port}, SRV enabled: ${enableSRV}`);
        const resolved = await resolveAddressWithSRV(host, port, enableSRV);

        if (resolved.isSRV) {
          console.log(`[Minecraft Ping] SRV record resolved: ${host}:${port} -> ${resolved.host}:${resolved.port}`);
          host = resolved.host;
          port = resolved.port;
        } else {
          console.log(`[Minecraft Ping] Using direct connection: ${host}:${port}`);
        }

        const result = await new MCServerStatus(port, host).getStatus();
        if (result.online) {
          instance.info.mcPingOnline = true;
          instance.info.currentPlayers = toNumber(result.current_players) ?? 0;
          instance.info.maxPlayers = toNumber(result.max_players) ?? 0;
          instance.info.version = result.version;
          instance.info.latency = toNumber(result.latency) ?? 0;
        } else {
          instance.resetPingInfo();
        }
        return result;
      }
    } catch (error) {
      instance.resetPingInfo();
      // ignore error
    }
    return null;
  }
}
