export interface LibraryService {
    verifyCode(code: number): Promise<boolean>;
}

class LibraryServiceImpl implements LibraryService {
    private URL: string = "http://192.168.50.65:3000/verify";

    async verifyCode(code: number): Promise<boolean> {
        const result = await fetch(this.URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: code
            }),
        });

        const text = await result.text();
        const booleanValue = text === 'true' ? true : false;
        return booleanValue;
    }
}

export const libraryService : LibraryService = new LibraryServiceImpl();