import type { FunctionComponent } from "react";
import React from "react";
import type { Color, PhotoshopPickerProps } from "react-color";
import { PhotoshopPicker } from "react-color";
import type { FieldRenderProps } from "react-final-form";

export const ColorPicker: FunctionComponent<
  FieldRenderProps<Color> & Omit<PhotoshopPickerProps, "color" | "onChange">
> = ({ input: { onChange, value }, ...props }) => {
  return <PhotoshopPicker {...props} onChange={onChange} color={value} />;
};
