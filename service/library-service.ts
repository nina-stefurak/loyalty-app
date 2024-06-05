export interface LibraryService {
    verifyCode(code: number): Promise<boolean>;
}

class LibraryServiceImpl implements LibraryService {
    private URL: string = "http://172.20.10.5:3000/verify";

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