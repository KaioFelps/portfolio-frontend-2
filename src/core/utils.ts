import {
  type Log,
  LogAction,
  LogTargetType,
} from "./types/presented-entities/log";

export function formatDateTime(date: Date) {
  return date.toLocaleDateString("pt-Br", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatLogString(log: Log) {
  let message: string;

  switch (log.action) {
    case LogAction.created:
      switch (log.targetType) {
        case LogTargetType.post:
          message = "Novo post";
          break;
        case LogTargetType.project:
          message = "Projeto criado";
          break;
        case LogTargetType.user:
          message = "Novo usuário registrado";
          break;
        case LogTargetType.tag:
          message = "Nova tag criada";
          break;
      }
      break;

    case LogAction.deleted:
      switch (log.targetType) {
        case LogTargetType.post:
          message = "Post deletado";
          break;
        case LogTargetType.project:
          message = "Projeto removido";
          break;
        case LogTargetType.user:
          message = "Usuário removido";
          break;
        case LogTargetType.tag:
          message = "Tag removida";
          break;
      }
      break;

    case LogAction.updated:
      switch (log.targetType) {
        case LogTargetType.post:
          message = "Post editado";
          break;
        case LogTargetType.project:
          message = "Projeto editado";
          break;
        case LogTargetType.user:
          message = "Alterações no usuário";
          break;
        case LogTargetType.tag:
          message = "Tag editada";
          break;
      }
      break;
  }

  message += `: "${log.target}", às ${log.createdAt.toLocaleString("pt-br")}`;

  if (log.author) message += ` por ${log.author.name} (${log.author.role})`;

  return message;
}
