"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Select from "@/component/select";

const queryByOptions = [
  { value: "title", label: "Buscar por título" },
  { value: "tag", label: "Buscar por tag" },
];

function getQueryByValue(qb: string | null) {
  return queryByOptions.find((opt) => opt.value === qb) ?? null;
}

export function Form() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryFormTimeoutId = useRef<NodeJS.Timeout | undefined>(undefined);

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [queryBy, setQueryBy] = useState(
    getQueryByValue(searchParams.get("qb")),
  );

  type HandleQueryProjectsArgs = {
    key?: string | null;
    value?: string;
    delay?: number;
  };

  const handleQueryProjects = useCallback(
    ({
      key = queryBy?.value,
      value = query,
      delay = 0,
    }: HandleQueryProjectsArgs = {}) => {
      clearTimeout(queryFormTimeoutId.current);
      queryFormTimeoutId.current = setTimeout(() => {
        if (value.trim() === "") return router.push(pathname);
        if (!key) return;

        console.log("handling", key, value);
        router.push(`?q=${value}&qb=${key}`);
      }, delay);
    },
    [query, queryBy, pathname, router],
  );

  useEffect(() => {
    const newQuery = searchParams.get("q");
    const newQueryBy = searchParams.get("qb");

    setQueryBy(getQueryByValue(newQueryBy));
    setQuery(newQuery ?? "");
  }, [searchParams]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-row gap-4 items-center justify-end max-sm:hidden"
    >
      <label className="flex gap-3 input">
        <span>
          <MagnifyingGlassIcon size="32" weight="regular" />
        </span>
        <span className="sr-only">Filtro</span>

        <input
          name="query"
          placeholder="Filtro"
          className="input-inner"
          defaultValue={query}
          onInput={(event) => {
            const query = event.currentTarget.value;
            setQuery(query);
            handleQueryProjects({ value: query, delay: 1500 });
          }}
        />
      </label>

      <Select.Root
        name="queryBy"
        value={queryBy?.value ?? null}
        onValueChange={(queryBy) => {
          setQueryBy(getQueryByValue(queryBy));
          handleQueryProjects({ key: queryBy });
        }}
        items={queryByOptions}
      >
        <Select.Trigger label={queryBy?.label ?? "Selecione um filtro"} />
        <Select.Content>
          {queryByOptions.map(({ value, label }) => (
            <Select.Item
              key={`project-select-${value}`}
              value={value}
              label={label}
            />
          ))}
        </Select.Content>
      </Select.Root>
    </form>
  );
}
