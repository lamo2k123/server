/* Int32 = 4 byte, range -2,147,483,648 to 2,147,483,647 */
export const MIN = -2147483648;
export const MAX = 2147483647;

export const getRandomInt32 = (min = MIN, max = MAX) => {
    const minValue = Math.ceil(min);
    const maxValue = Math.floor(max);

    return Math.floor(Math.random() * (maxValue - minValue) + minValue);
}