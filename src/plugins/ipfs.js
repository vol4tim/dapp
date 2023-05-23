// import { Buffer } from "buffer";
import axios from "axios";
import { create } from "ipfs-http-client";

class IpfsApiClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.authHeader = null;
  }
  auth(address, signature) {
    const authHeaderRaw = `sub-${address}:${signature}`;
    this.authHeader = Buffer.from(authHeaderRaw).toString("base64");
  }
  authClear() {
    this.authHeader = null;
  }
  async ls(cid) {
    const client = create({
      url: this.endpoint,
      headers: {
        authorization: `Basic ${this.authHeader}`
      }
    });
    const files = [];
    for await (const file of client.ls(cid)) {
      if (file.type === "file") {
        files.push(file);
      }
    }
    return files;
  }
  async cat(cid) {
    const client = create({
      url: this.endpoint,
      headers: {
        authorization: `Basic ${this.authHeader}`
      }
    });
    client.hashers();
    const cat = async (cid) => {
      const decoder = new TextDecoder();
      let content = "";
      for await (const chunk of client.cat(cid)) {
        content += decoder.decode(chunk, {
          stream: true
        });
      }
      return content;
    };
    return await cat(cid);
  }
  async add(data) {
    const client = create({
      url: this.endpoint,
      headers: {
        authorization: `Basic ${this.authHeader}`
      }
    });
    return await client.add(data);
  }
  async catViaGateway(gateway, cid, attempts = 5) {
    for (let index = 1; index <= attempts; index++) {
      try {
        return (await axios.get(`${gateway}${cid}`)).data;
      } catch (error) {
        console.log(error);
      }
    }
    throw new Error("File not available");
  }
}

let instance = null;
export function getInstance() {
  return instance;
}

export default {
  install: (app, params) => {
    instance = new IpfsApiClient(params.gateway);
    app.config.globalProperties.$ipfs = instance;
  }
};
