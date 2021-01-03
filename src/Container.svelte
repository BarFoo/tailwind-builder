<script>
    let selectedType = 'div';

	const settings = [
        {
            id: "type",
            displayName: "Type",
            displayType: "dropdown",
            values: [
                {id: 1, text: "div"},
                {id: 2, text: "article"},
                {id: 3, text:"aside"},
                {id: 4, text:"main"},
                {id: 5, text:"details"},
                {id: 6, text:"figcaption"},
                {id: 7, text: "figure"},
                {id: 8, text: "footer"},
                {id: 9, text:"header"},
                {id: 10, text: "main"},
                {id: 11, text:"mark"},
                {id: 12, text:"nav"},
                {id: 13, text:"section"},
                {id: 14, text: "summary"},
                {id: 15, text:"time"}
            ],
            isDeletable: false
        }
    ];

    export function getSettings() {
        return settings;
    }

    export function addSetting(setting) {
        settings.push(setting);
    }
</script>

{#if selectedType === "div"} 
    <div></div>
{/if}

<style> 
</style>
