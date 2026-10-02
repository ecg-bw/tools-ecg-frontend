<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  const docs = [
    {
      name: "Checkliste",
      url: "",
    },
    {
      name: "Kasse",
      url: "",
    },
    {
      name: "Standinfo",
      url: "",
    },
  ];
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <!-- <Table.Head class="w-[100px]">Name</Table.Head> -->
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each docs as doc}
      <Table.Row>
        <Table.Cell class="font-medium">{doc.name}</Table.Cell>
        <Table.Cell class="text-right">
          <a href={doc.url}><Button variant="outline">Download</Button></a>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
