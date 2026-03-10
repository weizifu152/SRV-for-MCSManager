// SRV Record Resolver for Minecraft and other services
// https://en.wikipedia.org/wiki/SRV_record
// Minecraft SRV format: _minecraft._tcp.<domain>

import dns from "dns";

export interface SRVRecord {
  priority: number;
  weight: number;
  port: number;
  name: string;
}

export interface ResolvedAddress {
  host: string;
  port: number;
  isSRV: boolean;
  originalHost?: string;
}

/**
 * Parse SRV record from DNS response
 * Format: priority weight port target
 */
function parseSRVRecord(data: string): SRVRecord | null {
  const parts = data.trim().split(/\s+/);
  if (parts.length >= 4) {
    return {
      priority: parseInt(parts[0], 10),
      weight: parseInt(parts[1], 10),
      port: parseInt(parts[2], 10),
      name: parts[3].replace(/\.$/, "") // Remove trailing dot
    };
  }
  return null;
}

/**
 * Resolve SRV records for a given service
 * @param service - Service name (e.g., "_minecraft")
 * @param protocol - Protocol (e.g., "_tcp")
 * @param domain - Domain name
 * @returns Array of SRV records sorted by priority and weight
 */
export function resolveSRV(
  service: string,
  protocol: string,
  domain: string
): Promise<SRVRecord[]> {
  return new Promise((resolve, reject) => {
    const srvName = `${service}.${protocol}.${domain}`;
    dns.resolveSrv(srvName, (err, addresses) => {
      if (err) {
        reject(err);
        return;
      }
      // Sort by priority (lower is higher priority), then by weight (higher is more likely)
      const sorted = addresses
        .map((addr) => ({
          priority: addr.priority,
          weight: addr.weight,
          port: addr.port,
          name: addr.name.replace(/\.$/, "") // Remove trailing dot
        }))
        .sort((a, b) => {
          if (a.priority !== b.priority) {
            return a.priority - b.priority;
          }
          return b.weight - a.weight;
        });
      resolve(sorted);
    });
  });
}

/**
 * Resolve Minecraft SRV record
 * Format: _minecraft._tcp.<domain>
 * @param domain - Domain name (e.g., "example.com")
 * @returns SRV record or null if not found
 */
export function resolveMinecraftSRV(domain: string): Promise<SRVRecord | null> {
  return new Promise((resolve) => {
    resolveSRV("_minecraft", "_tcp", domain)
      .then((records) => {
        if (records.length > 0) {
          resolve(records[0]);
        } else {
          resolve(null);
        }
      })
      .catch(() => {
        resolve(null);
      });
  });
}

/**
 * Check if a string looks like a domain (not an IP address)
 * @param host - Host string to check
 * @returns true if it's a domain, false if it's an IP
 */
export function isDomain(host: string): boolean {
  if (!host || typeof host !== "string") {
    return false;
  }

  const trimmedHost = host.trim();

  // Check if it's localhost
  if (trimmedHost === "localhost" || trimmedHost === "127.0.0.1" || trimmedHost === "::1") {
    return false;
  }

  // Check if it's an IPv4 address with stricter validation
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Regex.test(trimmedHost)) {
    // Validate each octet is 0-255
    const octets = trimmedHost.split(".");
    const isValidIp = octets.every((octet) => {
      const num = parseInt(octet, 10);
      return num >= 0 && num <= 255 && octet === num.toString();
    });
    if (isValidIp) {
      return false;
    }
  }

  // Check if it's an IPv6 address
  const ipv6Regex = /^\[?([0-9a-fA-F:]+)\]?$/;
  if (ipv6Regex.test(trimmedHost)) {
    return false;
  }

  // Check if it contains protocol (ws:// or wss://)
  if (trimmedHost.startsWith("ws://") || trimmedHost.startsWith("wss://")) {
    return false;
  }

  return true;
}

/**
 * Resolve address with SRV support
 * If the host is a domain, it will try to resolve SRV record first
 * @param host - Hostname or IP address
 * @param defaultPort - Default port to use if no SRV record found
 * @param enableSRV - Whether to enable SRV resolution
 * @returns Resolved address with host and port
 */
export async function resolveAddressWithSRV(
  host: string,
  defaultPort: number,
  enableSRV: boolean = true
): Promise<ResolvedAddress> {
  // If SRV is disabled or host is an IP, return as-is
  if (!enableSRV || !isDomain(host)) {
    return {
      host,
      port: defaultPort,
      isSRV: false
    };
  }

  try {
    const srvRecord = await resolveMinecraftSRV(host);
    if (srvRecord) {
      return {
        host: srvRecord.name,
        port: srvRecord.port,
        isSRV: true,
        originalHost: host
      };
    }
  } catch (error) {
    // SRV resolution failed, fall back to default
  }

  return {
    host,
    port: defaultPort,
    isSRV: false
  };
}

/**
 * Resolve daemon address with SRV support
 * Format: _mcsm-daemon._tcp.<domain>
 * @param domain - Domain name
 * @returns SRV record or null if not found
 */
export function resolveDaemonSRV(domain: string): Promise<SRVRecord | null> {
  return new Promise((resolve) => {
    resolveSRV("_mcsm-daemon", "_tcp", domain)
      .then((records) => {
        if (records.length > 0) {
          resolve(records[0]);
        } else {
          resolve(null);
        }
      })
      .catch(() => {
        resolve(null);
      });
  });
}

/**
 * Resolve daemon address with SRV support
 * @param host - Hostname or IP address
 * @param defaultPort - Default port to use if no SRV record found
 * @param enableSRV - Whether to enable SRV resolution
 * @returns Resolved address with host and port
 */
export async function resolveDaemonAddressWithSRV(
  host: string,
  defaultPort: number,
  enableSRV: boolean = true
): Promise<ResolvedAddress> {
  // If SRV is disabled or host is an IP, return as-is
  if (!enableSRV || !isDomain(host)) {
    return {
      host,
      port: defaultPort,
      isSRV: false
    };
  }

  try {
    const srvRecord = await resolveDaemonSRV(host);
    if (srvRecord) {
      return {
        host: srvRecord.name,
        port: srvRecord.port,
        isSRV: true,
        originalHost: host
      };
    }
  } catch (error) {
    // SRV resolution failed, fall back to default
  }

  return {
    host,
    port: defaultPort,
    isSRV: false
  };
}
