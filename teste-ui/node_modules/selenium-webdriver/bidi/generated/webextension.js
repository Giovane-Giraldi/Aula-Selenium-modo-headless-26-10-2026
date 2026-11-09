"use strict";
// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MozWebExtension = exports.WebExtension = void 0;
require("./common.js");
const record_js_1 = require("../serialization/record.js");
const union_js_1 = require("../serialization/union.js");
const domain_js_1 = require("../domain.js");
(0, record_js_1.defineAlias)('webExtension.Extension', { "primitive": "string" });
const WebExtensionInstall = (0, record_js_1.defineRecord)('webExtension.Install', [{ "name": "method", "wire": "method", "required": true, "type": { "const": "webExtension.install" } }, { "name": "params", "wire": "params", "required": true, "type": { "ref": "webExtension.InstallParameters" } }]);
const WebExtensionInstallParameters = (0, record_js_1.defineRecord)('webExtension.InstallParameters', [{ "name": "extensionData", "wire": "extensionData", "required": true, "type": { "ref": "webExtension.ExtensionData" } }], { "extensible": true });
const WebExtensionExtensionDataUnion = (0, union_js_1.defineUnion)('webExtension.ExtensionData', { "by": "type", "variants": [{ "value": "archivePath", "ref": "webExtension.ExtensionArchivePath" }, { "value": "base64", "ref": "webExtension.ExtensionBase64Encoded" }, { "value": "path", "ref": "webExtension.ExtensionPath" }] }, { "objectOnly": true });
const WebExtensionExtensionPath = (0, record_js_1.defineRecord)('webExtension.ExtensionPath', [{ "name": "type", "wire": "type", "required": true, "type": { "const": "path" } }, { "name": "path", "wire": "path", "required": true, "type": { "primitive": "string" } }]);
const WebExtensionExtensionArchivePath = (0, record_js_1.defineRecord)('webExtension.ExtensionArchivePath', [{ "name": "type", "wire": "type", "required": true, "type": { "const": "archivePath" } }, { "name": "path", "wire": "path", "required": true, "type": { "primitive": "string" } }]);
const WebExtensionExtensionBase64Encoded = (0, record_js_1.defineRecord)('webExtension.ExtensionBase64Encoded', [{ "name": "type", "wire": "type", "required": true, "type": { "const": "base64" } }, { "name": "value", "wire": "value", "required": true, "type": { "primitive": "string" } }]);
const WebExtensionInstallResult = (0, record_js_1.defineRecord)('webExtension.InstallResult', [{ "name": "extension", "wire": "extension", "required": true, "type": { "ref": "webExtension.Extension" } }]);
const WebExtensionUninstall = (0, record_js_1.defineRecord)('webExtension.Uninstall', [{ "name": "method", "wire": "method", "required": true, "type": { "const": "webExtension.uninstall" } }, { "name": "params", "wire": "params", "required": true, "type": { "ref": "webExtension.UninstallParameters" } }]);
const WebExtensionUninstallParameters = (0, record_js_1.defineRecord)('webExtension.UninstallParameters', [{ "name": "extension", "wire": "extension", "required": true, "type": { "ref": "webExtension.Extension" } }]);
(0, record_js_1.defineAlias)('webExtension.UninstallResult', { "ref": "EmptyResult" });
const WebExtensionMozInstallParameters = (0, record_js_1.defineRecord)('webExtension.MozInstallParameters', [{ "name": "extensionData", "wire": "extensionData", "required": true, "type": { "ref": "webExtension.ExtensionData" } }, { "name": "allowPrivateBrowsing", "wire": "moz:allowPrivateBrowsing", "required": false, "type": { "primitive": "boolean" } }, { "name": "permanent", "wire": "moz:permanent", "required": false, "type": { "primitive": "boolean" } }], { "extensible": true });
const WebExtensionMozListExtensionsResult = (0, record_js_1.defineRecord)('webExtension.MozListExtensionsResult', [{ "name": "extensions", "wire": "extensions", "required": true, "type": { "list": { "ref": "webExtension.MozExtensionInfo" } } }]);
const WebExtensionMozExtensionInfo = (0, record_js_1.defineRecord)('webExtension.MozExtensionInfo', [{ "name": "id", "wire": "id", "required": true, "type": { "primitive": "string" } }, { "name": "name", "wire": "name", "required": true, "type": { "primitive": "string" } }, { "name": "version", "wire": "version", "required": true, "type": { "primitive": "string" } }, { "name": "manifestVersion", "wire": "manifestVersion", "required": true, "type": { "ref": "js-uint" } }, { "name": "isActive", "wire": "isActive", "required": true, "type": { "primitive": "boolean" } }, { "name": "isSystem", "wire": "isSystem", "required": true, "type": { "primitive": "boolean" } }, { "name": "hidden", "wire": "hidden", "required": true, "type": { "primitive": "boolean" } }, { "name": "temporarilyInstalled", "wire": "temporarilyInstalled", "required": true, "type": { "primitive": "boolean" } }, { "name": "sourceURL", "wire": "sourceURL", "required": false, "type": { "primitive": "string", "nullable": true } }, { "name": "policy", "wire": "policy", "required": false, "type": { "ref": "webExtension.MozExtensionPolicyInfo", "nullable": true } }]);
const WebExtensionMozExtensionPolicyInfo = (0, record_js_1.defineRecord)('webExtension.MozExtensionPolicyInfo', [{ "name": "uuid", "wire": "uuid", "required": true, "type": { "primitive": "string" } }, { "name": "baseURL", "wire": "baseURL", "required": true, "type": { "primitive": "string" } }, { "name": "extensionURL", "wire": "extensionURL", "required": true, "type": { "primitive": "string" } }, { "name": "backgroundScripts", "wire": "backgroundScripts", "required": true, "type": { "list": { "primitive": "string" } } }]);
// --- Implementation ---
/**
 * This is an unsupported API. No compatibility guarantees are provided.
 * It tracks the W3C WebDriver BiDi specification directly. As the specification
 * evolves, this API will change or be removed without prior notice.
 */
class WebExtension extends domain_js_1.Domain {
    static async create(driver) {
        return new WebExtension(await domain_js_1.Domain.connect(driver), domain_js_1.DOMAIN_TOKEN);
    }
    /**
     * @param {WebExtensionInstallParameters} params
     * @param {WebExtensionExtensionData} params.extensionData
     * @returns {Promise<WebExtensionInstallResult>}
     * @see https://w3c.github.io/webdriver-bidi/#command-webExtension-install
     */
    async install(params) {
        const validatedParams = new WebExtensionInstallParameters(params);
        const result = await this.send('webExtension.install', validatedParams);
        return WebExtensionInstallResult.fromWire(result);
    }
    /**
     * @param {WebExtensionUninstallParameters} params
     * @param {WebExtensionExtension} params.extension
     * @returns {Promise<void>}
     * @see https://w3c.github.io/webdriver-bidi/#command-webExtension-uninstall
     */
    async uninstall(params) {
        const validatedParams = new WebExtensionUninstallParameters(params);
        await this.send('webExtension.uninstall', validatedParams);
    }
}
exports.WebExtension = WebExtension;
/**
 * moz: vendor variant of WebExtension, with browser-specific commands and params.
 * Construct with MozWebExtension.create(driver) for a matching session; other sessions use WebExtension.
 *
 * This is an unsupported API. No compatibility guarantees are provided.
 * It tracks the W3C WebDriver BiDi specification directly. As the specification
 * evolves, this API will change or be removed without prior notice.
 */
class MozWebExtension extends WebExtension {
    static async create(driver) {
        return new MozWebExtension(await domain_js_1.Domain.connect(driver), domain_js_1.DOMAIN_TOKEN);
    }
    /**
     * @param {WebExtensionMozInstallParameters} params
     * @param {WebExtensionExtensionData} params.extensionData
     * @param {boolean} [params.allowPrivateBrowsing]
     * @param {boolean} [params.permanent]
     * @returns {Promise<WebExtensionInstallResult>}
     * @see https://w3c.github.io/webdriver-bidi/#command-webExtension-install
     */
    async install(params) {
        const validatedParams = new WebExtensionMozInstallParameters(params);
        const result = await this.send('webExtension.install', validatedParams);
        return WebExtensionInstallResult.fromWire(result);
    }
    /**
     * @returns {Promise<WebExtensionMozListExtensionsResult>}
     */
    async listExtensions() {
        const result = await this.send('webExtension.moz:listExtensions', {});
        return WebExtensionMozListExtensionsResult.fromWire(result);
    }
}
exports.MozWebExtension = MozWebExtension;
