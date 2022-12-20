const envURLMapping = {
    "conduit" : "https://api.conduit.xyz/public/network/metadata/",
    "conduit-staging" : "https://api.staging.conduit.xyz/public/network/metadata/",
    "conduit-localhost" : "http://localhost:8080/public/network/metadata/",
}

export const getConfigURL = (
    slug: string,
): string => {
    const tokens = slug.split(":")
    if (tokens.length != 2) {
        throw Error(`malformed slug. Must be of the form [prefix]:[identifier]`)
    }

    if (!(tokens[0] in envURLMapping)) {
        throw Error('malformed slug. Prefix must be oneof [conduit, conduit-staging, conduit-localhost]')
    }

    return envURLMapping[tokens[0]] + tokens[1]
}