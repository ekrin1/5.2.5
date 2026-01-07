import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MantineProvider } from "@mantine/core";
import { JobCard } from "./jobCard";
import type { JobType } from "../../services/types";

const vacancyMock: JobType = {
  id: "1",
  name: "Frontend Developer",
  salary: {
    from: 100000,
    to: 150000,
    currency: "RUR",
  },
  experience: {
    name: "От 1 года до 3 лет",
  },
  employer: {
    name: "HH",
  },
  area: {
    name: "Москва",
  },
  work_format: [
    {
      id: "REMOTE",
      name: "Удалённая работа",
    },
  ],
  alternate_url: "https://hh.ru/vacancy/123",
};

describe("JobCard", () => {
  it("рендерит название вакансии", () => {
    render(
      <MantineProvider>
        <JobCard vacancy={vacancyMock} />
      </MantineProvider>
    );

    expect(
      screen.getByText("Frontend Developer")
    ).toBeInTheDocument();
  });

  it("корректно отображает зарплату", () => {
    render(
      <MantineProvider>
        <JobCard vacancy={vacancyMock} />
      </MantineProvider>
    );

    expect(
      screen.getByText("100 000 – 150 000 ₽")
    ).toBeInTheDocument();
  });

  it("отображает формат работы", () => {
    render(
      <MantineProvider>
        <JobCard vacancy={vacancyMock} />
      </MantineProvider>
    );

    expect(
      screen.getByText("Можно удалённо")
    ).toBeInTheDocument();
  });

  it("кнопка «Откликнуться» содержит ссылку на вакансию", () => {
    render(
      <MantineProvider>
        <JobCard vacancy={vacancyMock} />
      </MantineProvider>
    );

    const link = screen.getByRole("link", {
      name: "Откликнуться",
    });

    expect(link).toHaveAttribute(
      "href",
      "https://hh.ru/vacancy/123"
    );
  });
});
