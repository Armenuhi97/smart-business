export function imageRegExp(file: File, types = ['jpg', 'jpeg', 'png', 'webp'], type = 'image') {
    return new RegExp(`${type}\/(${types.join('|')})`).test(file.type);
}