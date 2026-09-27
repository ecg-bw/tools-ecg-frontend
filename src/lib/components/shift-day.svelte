<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { Input } from "$lib/components/ui/input/index";
  const contactInfo = "Vorname Nachname, Tel.";
</script>

<Table.Root>
  <Table.Header></Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell class="font-medium">Aufbauen</Table.Cell>
      <Table.Cell class="flex flex-col gap-1">
        <Input type="text" placeholder={contactInfo} />
        <Input type="text" placeholder={contactInfo} />
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell class="font-medium">Schicht 1</Table.Cell>
      <Table.Cell class="flex flex-col gap-1">
        <Input type="text" placeholder={contactInfo} />
        <Input type="text" placeholder={contactInfo} />
        <Input type="text" placeholder={contactInfo} />
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell class="font-medium">Schicht 2</Table.Cell>
      <Table.Cell class="flex flex-col gap-1">
        <Input type="text" placeholder={contactInfo} />
        <Input type="text" placeholder={contactInfo} />
        <Input type="text" placeholder={contactInfo} />
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
