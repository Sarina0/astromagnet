import { ColorPalette } from "@app/theme/colors";

export const colorWithOpacity = (color: ColorPalette, opacity: number): string => {
    const op = Math.max(0, Math.min(opacity, 100))
    const hexValue = op.toString(16);
    return color + hexValue
}