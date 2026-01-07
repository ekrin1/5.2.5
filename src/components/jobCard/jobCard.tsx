import type { JobType } from "../../services/types";
import { Group, Button, Text, Badge } from "@mantine/core";
import clsx from "clsx";

import styles from "./jobCard.module.css";

type Props = {
  vacancy: JobType;
};

export const JobCard = ({ vacancy }: Props) => {

    const formatNumber = (num?: number) => {
      if (!num) return "";
      return new Intl.NumberFormat("ru-RU").format(num);
    };

    const formatCurrency = (currencyName?: string) => {
      if (currencyName?.includes("RUR")) return "₽";
      if (currencyName?.includes("KZT")) return "₸";
      if (currencyName?.includes("USD")) return "$";
      return currencyName;
    };

    const salary = vacancy.salary
    ? `${vacancy.salary.from ? `${formatNumber(vacancy.salary.from)}` : ""} ${
        vacancy.salary.to ? `– ${formatNumber(vacancy.salary.to)}` : ""
        } ${formatCurrency(vacancy.salary.currency) || ""}`
    : "Не указана";

    const formatExperience = (experienceName?: string) => {
      if (!experienceName) return "Не указано";

    const normalized = experienceName.toLowerCase().trim();

    if (normalized.includes("нет опыта")) {
      return "Без опыта";
    }

    if (/от\s*\d+.*до\s*\d+/i.test(normalized)) {
      const match = normalized.match(/от\s*(\d+).+до\s*(\d+)/i);
      if (match) {
        const from = Number(match[1]);
        const to = Number(match[2]);
        const yearsWord = to > 5 ? "лет" : "года";
        return `Опыт ${from}–${to} ${yearsWord}`;
      }
    }

      return experienceName;
    };

    const getWorkFormatData = (formatId: string) => {
      switch (formatId) {

      case "REMOTE":
        return {
          label: "Можно удалённо",
          bg: "var(--mantine-color-primary-4)",
          color: "var(--mantine-color-white-0)",
        };

      case "ON_SITE":
        return {
          label: "Офис",
          bg: "var(--mantine-color-ultraLight-9)",
          color: "var(--mantine-color-gray-9)",
        };

      case "HYBRID":
        return {
          label: "Гибрид",
          bg: "var(--mantine-color-black-9)",
          color: "var(--mantine-color-white-0)",
        };

      default:
        return {
          label: "Не указано",
          bg: "var(--mantine-color-gray-1)",
          color: "var(--mantine-color-black-9)",
        };
    }
  };

    const workFormat = vacancy.work_format?.[0];
    const { label, bg, color } = workFormat
      ? getWorkFormatData(workFormat.id)
      : {
          label: "Не указано",
          bg: "var(--mantine-color-gray-1)",
          color: "var(--mantine-color-black-9)",
        };

  return (

    <div className={styles.card}>

      <Text className={styles.title}>{vacancy.name}</Text>
        <Group className={styles.wrapper}>
          <Text className={styles.salary}>{salary}</Text>
          <Text className={styles.experience}>
            {formatExperience(vacancy.experience?.name)}
          </Text>
        </Group>

      <Text className={styles.company}>{vacancy.employer.name}</Text>
        <Badge
          className={styles.badge}
          style={{ backgroundColor: bg, color: color }}
        >
          {label}
        </Badge>
      <Text className={styles.area}>{vacancy.area.name}</Text>

      <Group className={styles.buttons}>
        <Button
          className={clsx(styles.button, styles["button-view"])}
          color="black.9"
        >
          Смотреть вакансию
        </Button>

        <Button
          className={clsx(styles.button, styles["button-apply"])}
          component="a"
          href={vacancy.alternate_url}
          target="_blank"
          rel="noreferrer"
          color="ultraLight.9"
        >
          Откликнуться
        </Button>
      </Group>

    </div>

  );
};

