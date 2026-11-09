import type { EmptyResult, JsUint } from './common.js';
import './common.js';
import { Domain } from '../domain.js';
export type WebExtensionExtension = string;
export interface WebExtensionInstall {
    method: "webExtension.install";
    params: WebExtensionInstallParameters;
}
export interface WebExtensionInstallParameters {
    extensionData: WebExtensionExtensionData;
}
export type WebExtensionExtensionData = WebExtensionExtensionArchivePath | WebExtensionExtensionBase64Encoded | WebExtensionExtensionPath;
export interface WebExtensionExtensionPath {
    type: "path";
    path: string;
}
export interface WebExtensionExtensionArchivePath {
    type: "archivePath";
    path: string;
}
export interface WebExtensionExtensionBase64Encoded {
    type: "base64";
    value: string;
}
export interface WebExtensionInstallResult {
    extension: WebExtensionExtension;
}
export interface WebExtensionUninstall {
    method: "webExtension.uninstall";
    params: WebExtensionUninstallParameters;
}
export interface WebExtensionUninstallParameters {
    extension: WebExtensionExtension;
}
export type WebExtensionUninstallResult = EmptyResult;
export interface WebExtensionMozInstallParameters {
    extensionData: WebExtensionExtensionData;
    allowPrivateBrowsing?: boolean;
    permanent?: boolean;
}
export interface WebExtensionMozListExtensionsResult {
    extensions: Array<WebExtensionMozExtensionInfo>;
}
export interface WebExtensionMozExtensionInfo {
    id: string;
    name: string;
    version: string;
    manifestVersion: JsUint;
    isActive: boolean;
    isSystem: boolean;
    hidden: boolean;
    temporarilyInstalled: boolean;
    sourceURL?: string | null;
    policy?: WebExtensionMozExtensionPolicyInfo | null;
}
export interface WebExtensionMozExtensionPolicyInfo {
    uuid: string;
    baseURL: string;
    extensionURL: string;
    backgroundScripts: Array<string>;
}
/**
 * This is an unsupported API. No compatibility guarantees are provided.
 * It tracks the W3C WebDriver BiDi specification directly. As the specification
 * evolves, this API will change or be removed without prior notice.
 */
export declare class WebExtension extends Domain {
    static create(driver: unknown): Promise<WebExtension>;
    /**
     * @param {WebExtensionInstallParameters} params
     * @param {WebExtensionExtensionData} params.extensionData
     * @returns {Promise<WebExtensionInstallResult>}
     * @see https://w3c.github.io/webdriver-bidi/#command-webExtension-install
     */
    install(params: WebExtensionInstallParameters): Promise<WebExtensionInstallResult>;
    /**
     * @param {WebExtensionUninstallParameters} params
     * @param {WebExtensionExtension} params.extension
     * @returns {Promise<void>}
     * @see https://w3c.github.io/webdriver-bidi/#command-webExtension-uninstall
     */
    uninstall(params: WebExtensionUninstallParameters): Promise<void>;
}
/**
 * moz: vendor variant of WebExtension, with browser-specific commands and params.
 * Construct with MozWebExtension.create(driver) for a matching session; other sessions use WebExtension.
 *
 * This is an unsupported API. No compatibility guarantees are provided.
 * It tracks the W3C WebDriver BiDi specification directly. As the specification
 * evolves, this API will change or be removed without prior notice.
 */
export declare class MozWebExtension extends WebExtension {
    static create(driver: unknown): Promise<MozWebExtension>;
    /**
     * @param {WebExtensionMozInstallParameters} params
     * @param {WebExtensionExtensionData} params.extensionData
     * @param {boolean} [params.allowPrivateBrowsing]
     * @param {boolean} [params.permanent]
     * @returns {Promise<WebExtensionInstallResult>}
     * @see https://w3c.github.io/webdriver-bidi/#command-webExtension-install
     */
    install(params: WebExtensionMozInstallParameters): Promise<WebExtensionInstallResult>;
    /**
     * @returns {Promise<WebExtensionMozListExtensionsResult>}
     */
    listExtensions(): Promise<WebExtensionMozListExtensionsResult>;
}
