export const compressString = (input: string): string => {
    !input && "";

    let compressed: string[] = [];
    let count: number = 1;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === input[i + 1]) {
            count++;
        } else {
            compressed.push(input[i] + count);
            count = 1;
        }
    }

    return compressed.join("");
};

export const decompressString = (input: string): string => {
    let decompressed: string[] = [];
    let i: number = 0;

    while (i < input.length) {
        const char = input[i];
        i++;

        let countStr = "";
        while (i < input.length && /\d/.test(input[i])) {
            countStr += input[i];
            i++;
        }

        const count = Number(countStr) || 1;
        decompressed.push(char.repeat(count));
    }

    return decompressed.join("");
};

export const isDecompressible = (input: string): boolean => {
    return /^[a-z]\d+(\d*[a-z]\d+)*$/.test(input);
};