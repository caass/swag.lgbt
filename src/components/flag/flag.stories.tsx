import { type Meta, type StoryObj } from "storybook-framework-qwik";
import { Flag, type FlagName, type FlagProps } from ".";
import { FlagContext } from "~/components/flag-provider";
import { Slot, component$, useContextProvider, useSignal, useStyles$ } from "@builder.io/qwik";

type StorybookFlagProps = FlagProps & { flag: FlagName };

const meta: Meta<StorybookFlagProps> = {
  component: Flag,
  args: { flag: "lesbian" },
  argTypes: {
    flag: {
      options: ["lesbian", "progress-pride", "trans"] as FlagName[],
      control: { type: "select" },
    },
  },
};

type Story = StoryObj<StorybookFlagProps>;

export default meta;

const StorybookFlagProvider = component$(({ flag }: { flag: FlagName }) => {
  useContextProvider(FlagContext, useSignal(flag));
  return <Slot />;
});

const SmallFlag = component$(({ flag }: { flag: FlagName }) => {
  useStyles$(`.flag { width: 90px }`);
  return (
    <StorybookFlagProvider flag={flag}>
      <Flag class="flag" />
    </StorybookFlagProvider>
  );
});

export const Small: Story = {
  render: ({ flag }) => <SmallFlag flag={flag} />,
};

const LargeFlag = component$(({ flag }: { flag: FlagName }) => {
  useStyles$(`.flag { width: 450px }`);
  return (
    <StorybookFlagProvider flag={flag}>
      <Flag class="flag" />
    </StorybookFlagProvider>
  );
});

export const Large: Story = {
  render: ({ flag }) => <LargeFlag flag={flag} />,
};
