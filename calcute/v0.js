document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable');
    const resultPanel = document.getElementById('resultPanel');
    let draggedItem = null;

    // 为所有可拖拽元素添加事件监听
    function addDragEvents(element) {
        element.addEventListener('dragstart', handleDragStart);
        element.addEventListener('dragend', handleDragEnd);
        element.addEventListener('dragover', handleDragOver);
        element.addEventListener('drop', handleDrop);
    }

    // 为初始元素添加拖拽事件
    draggables.forEach(draggable => {
        addDragEvents(draggable);
    });

    // 拖拽开始
    function handleDragStart(e) {
        draggedItem = this;
        this.style.opacity = '0.4';
        
        e.dataTransfer.setData('text/plain', JSON.stringify({
            type: this.dataset.type,
            value: this.dataset.value,
            op: this.dataset.op,
            text: this.innerText,
            fromResult: this.closest('#resultPanel') !== null
        }));
    }

    // 拖拽结束
    function handleDragEnd(e) {
        this.style.opacity = '1';
        draggedItem = null;

        // 移除所有拖拽过程中的视觉效果
        document.querySelectorAll('.draggable').forEach(item => {
            item.classList.remove('drag-over');
        });
    }

    // 拖拽经过其他元素
    function handleDragOver(e) {
        e.preventDefault();
        if (this !== draggedItem && this.closest('#resultPanel')) {
            this.classList.add('drag-over');
        }
    }

    // 处理放置
    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        
        // 如果是从结果面板内部拖拽
        if (data.fromResult && this.closest('#resultPanel')) {
            if (this !== draggedItem) {
                const allItems = [...resultPanel.getElementsByClassName('draggable')];
                const draggedIndex = allItems.indexOf(draggedItem);
                const droppedIndex = allItems.indexOf(this);

                if (draggedIndex < droppedIndex) {
                    this.parentNode.insertBefore(draggedItem, this.nextSibling);
                } else {
                    this.parentNode.insertBefore(draggedItem, this);
                }
            }
            return;
        }

        // 从左侧面板拖到结果面板
        if (!data.fromResult) {
            const newElement = document.createElement('div');
            newElement.className = 'draggable';
            newElement.draggable = true;
            newElement.innerText = data.text;
            
            newElement.dataset.type = data.type;
            if (data.type === 'metric') {
                newElement.dataset.value = data.value;
            } else if (data.type === 'operation') {
                newElement.dataset.op = data.op;
                newElement.classList.add('operation');
            }

            // 添加拖拽事件监听器
            addDragEvents(newElement);

            // 如果放置在结果面板中的特定元素上
            if (this.closest('#resultPanel')) {
                this.parentNode.insertBefore(newElement, this);
            } else {
                resultPanel.appendChild(newElement);
            }
        }
    }

    // 结果面板也需要处理放置
    resultPanel.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    resultPanel.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.target === resultPanel) {
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            if (!data.fromResult) {
                const newElement = document.createElement('div');
                newElement.className = 'draggable';
                newElement.draggable = true;
                newElement.innerText = data.text;
                
                newElement.dataset.type = data.type;
                if (data.type === 'metric') {
                    newElement.dataset.value = data.value;
                } else if (data.type === 'operation') {
                    newElement.dataset.op = data.op;
                    newElement.classList.add('operation');
                }

                addDragEvents(newElement);
                resultPanel.appendChild(newElement);
            }
        }
    });
});
