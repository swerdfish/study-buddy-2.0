export class Utilities {

    public static hexToRgb(hexColor: string): { r: number, g: number, b: number } {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    public static calcBlackOrWhite(hexColor: string): boolean {
        let rgb = this.hexToRgb(hexColor);
        if (rgb) {
            let brightness = Math.round(
                (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
            );
            return brightness > 125;
        } else {
            return true;
        }
    }

    public static invertHexColor(hexColor: string): string {
        let rgb = this.hexToRgb(hexColor);
        return rgb ? this.rgbToHex({
            r: 255 - rgb.r,
            g: 255 - rgb.g,
            b: 255 - rgb.b,
        }) : null;
    }

    public static colorChannelToHex(colorChannel: number): string {
        let hex = colorChannel.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    public static rgbToHex(rgb: { r: number, g: number, b: number }): string {
        return "#" + this.colorChannelToHex(rgb.r) + this.colorChannelToHex(rgb.g) + this.colorChannelToHex(rgb.b);
    }

}