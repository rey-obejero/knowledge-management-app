using KnowledgeManagementApp.Api.Application.Dtos;
using KnowledgeManagementApp.Api.Domain.Entities;
using Riok.Mapperly.Abstractions;

namespace KnowledgeManagementApp.Api.Application.Mappers;

[Mapper]
public partial class EntryMapper
{
    public partial EntryResultDto EntryToEntryResultDto(Entry entry);
}
