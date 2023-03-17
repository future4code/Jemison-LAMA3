export class HashManagerMock {
    public hash = async (plaintext: string): Promise<string> => {
        if (plaintext == "text") {
            return "hash-text"
        }
        return "hash-mock"
    }
    public compare = async (plaintext: string, hash: string): Promise<boolean> => {
        if (plaintext == "text" && hash == "hash-text") {
            return true
        }
        return false
    }
}