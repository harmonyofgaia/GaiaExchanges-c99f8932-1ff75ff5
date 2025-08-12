// UI/UX Framework for GAIA Engine
// Provides the foundation for building modern, extensible user interfaces

export interface UIComponent {
  id: string;
  render(): unknown;
}

export class UIFramework {
  private components: Map<string, UIComponent> = new Map();

  public registerComponent(component: UIComponent) {
    this.components.set(component.id, component);
  }

  public renderAll() {
    for (const component of this.components.values()) {
      component.render();
    }
  }
}
