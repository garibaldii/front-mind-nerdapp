"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

import { IArticle } from "@/interface/IArticle";
import { DataTable } from "./data-table";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { ActionModal } from "@/components/molecules/ActionModal";
import { deleteArticle } from "@/service/ArticleService";
import { useUser } from "@/context/UserContext";

interface Props {
  articles: IArticle[];
}

export default function ArticleDataTable({ articles }: Props) {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { refreshUserData } = useUser();

  useEffect(() => {refreshUserData()});

  const handleDelete = async () => {
    if (selectedId !== null) {
      try {
        await deleteArticle(selectedId);
        setModal(false);
      } catch (err) {
        console.error("Erro ao deletar:", err);
      }
    }
  };

  const columns = useMemo<ColumnDef<IArticle>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Título",
        cell: ({ row }) => <div>{row.getValue("title")}</div>,
      },
      {
        accessorKey: "releaseDate",
        header: "Data de Postagem",
        cell: ({ row }) => <div>{row.getValue("releaseDate")}</div>,
      },
      {
        accessorKey: "content",
        header: "Prévia do conteúdo",
        cell: ({ row }) => (
          <div className="line-clamp-2">{row.getValue("content")}</div>
        ),
      },
      {
        accessorKey: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const article = row.original as IArticle;
          return (
            <div className="flex p-3">
              <Button
                className="mr-3"
                onClick={() => router.push(`/pages/edit/${article.id}`)}
              >
                ✏️
              </Button>
              <Button
                onClick={() => {
                  setSelectedId(article.id);
                  setModal(true);
                }}
              >
                🗑️
              </Button>
            </div>
          );
        },
      },
    ],
    [router]
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={articles}
        pageSize={10}
        searchFields={["title", "content"]}
      />
      <ActionModal
        title="Excluir Artigo"
        description="Atenção, tem certeza que deseja excluir este artigo?"
        open={modal}
        onClose={() => setModal(false)}
        onSubmit={handleDelete}
      />
    </>
  );
}
