export async function asyncWrapFunction(asyncfunction, variablesJson) {
    await asyncfunction({
        variables: variablesJson
    })
}