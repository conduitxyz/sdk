/* eslint-disable @typescript-eslint/no-empty-function */
import {expect} from './setup'
import { getConfigURL } from '../src/config/config'

describe('config', () => {
    describe('getProdURL', () => {
        it('should return the correct prod url', () => {
            const url = getConfigURL("conduit:slug_here");
            expect(url).to.equal(`https://api.conduit.xyz/public/network/metadata/slug_here`)
        })
    })

    describe('getStagingURL', () => {
        it('should return the correct staging url', () => {
            const url = getConfigURL("conduit-staging:slug_here");
            expect(url).to.equal(`https://api.conduit-stg.xyz/public/network/metadata/slug_here`)
        })
    })

    describe('getLocalhostURL', () => {
        it('should return the correct localhost url', () => {
            const url = getConfigURL("conduit-localhost:slug_here");
            expect(url).to.equal(`http://localhost:8080/public/network/metadata/slug_here`)
        })
    })

    describe('throws error', () => {
        it('should return an error for a bad prefix', () => {
            expect(getConfigURL.bind(getConfigURL, "conduit-bad-prefix:slug_here")).to.throw('malformed slug. Prefix must be one of [conduit, conduit-staging, conduit-localhost]');
        })

        it('should return an error for a malformed slug', () => {
            expect(getConfigURL.bind(getConfigURL, "cond:uit-bad-prefix:slug_here")).to.throw('malformed slug. Must be of the form [prefix]:[identifier]');
        })
    })
})
