import { describe, test, expect } from "vitest";

import { getConfigURL } from "./config";

describe("config", () => {
  test("getProdURL", () => {
    it("should return the correct prod url", () => {
      const url = getConfigURL("conduit:slug_here");
      expect(url).toBe(
        `https://api.conduit.xyz/public/network/metadata/slug_here`
      );
    });
  });

  test("getStagingURL", () => {
    it("should return the correct staging url", () => {
      const url = getConfigURL("conduit-staging:slug_here");
      expect(url).toBe(
        `https://api.conduit-stg.xyz/public/network/metadata/slug_here`
      );
    });
  });

  test("getLocalhostURL", () => {
    it("should return the correct localhost url", () => {
      const url = getConfigURL("conduit-localhost:slug_here");
      expect(url).toBe(
        `http://localhost:8080/public/network/metadata/slug_here`
      );
    });
  });

  test("throws error", () => {
    it("should return an error for a bad prefix", () => {
      expect(() => getConfigURL("conduit-bad-prefix:slug_here")).toThrow(
        "malformed slug. Prefix must be one of [conduit, conduit-staging, conduit-localhost]"
      );
    });

    it("should return an error for a malformed slug", () => {
      expect(() => getConfigURL("cond:uit-bad-prefix:slug_here")).toThrow(
        "malformed slug. Must be of the form [prefix]:[identifier]"
      );
    });
  });
});
