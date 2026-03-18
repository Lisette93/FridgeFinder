import { colors } from "./colors";

export const typography = {
  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 32,
    fontWeight: "700" as const,
    color: colors.white,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500" as const,
    color: colors.textSecondary,
  },
  body: {
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 14,
    color: colors.textPrimary,
  },
};
