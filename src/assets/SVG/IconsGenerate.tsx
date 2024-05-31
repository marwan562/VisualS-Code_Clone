type TProps = {
  name: string;
  isOpen?: boolean;
  isFolder?: boolean;
};

const icons: Record<string, { default: string }> = import.meta.glob(
  "../icons/*.svg",
  {
    eager: true,
  }
);

const getIconComponent = ({ name, isOpen, isFolder }: TProps) => {
  const extintionFolder = name?.toLowerCase()?.split("_")[0];
  const extintionFile = name?.split(".")?.pop()?.toLowerCase();
  const openFolder = isOpen ? "-open" : "";
  // icons folders
  const iconPathFolder =
    icons[`../icons/folder-${extintionFolder}${openFolder}.svg`]?.default ||
    icons[`../icons/folder-default${openFolder}.svg`]?.default;
  // icons files
  const iconPathFile =
    icons[`../icons/${extintionFile}.svg`]?.default ||
    icons[`../icons/default.svg`]?.default;

  return isFolder ? iconPathFolder : iconPathFile;
};

const FolderStyles = ({ name, isOpen, isFolder }: TProps) => {
  const IconComponent = getIconComponent({ name, isOpen, isFolder });

  return <img src={IconComponent} alt={name} className="w-5 h-5" />;
};

export default FolderStyles;
