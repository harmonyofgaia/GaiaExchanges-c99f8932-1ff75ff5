export interface PatternNode {
  id: string;
  x: number;
  y: number;
  intensity: number;
  connections: string[];
}

export function createPatternNode(x: number, y: number, intensity: number = 0.5): PatternNode {
  return {
    id: Math.random().toString(36).substr(2, 9),
    x,
    y,
    intensity,
    connections: [],
  };
}

export class Quadtree {
  boundary: { x: number; y: number; width: number; height: number };
  capacity: number;
  points: PatternNode[];
  divided: boolean;

  constructor(
    boundary: { x: number; y: number; width: number; height: number },
    capacity: number = 4
  ) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  insert(point: PatternNode): boolean {
    if (!this.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    return true;
  }

  contains(point: PatternNode): boolean {
    return (
      point.x >= this.boundary.x &&
      point.x < this.boundary.x + this.boundary.width &&
      point.y >= this.boundary.y &&
      point.y < this.boundary.y + this.boundary.height
    );
  }

  subdivide() {
    const { x, y, width, height } = this.boundary;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    this.divided = true;
  }

  query(range: { x: number; y: number; width: number; height: number }): PatternNode[] {
    const found: PatternNode[] = [];

    this.points.forEach((point) => {
      if (this.rangeContains(range, point)) {
        found.push(point);
      }
    });

    return found;
  }

  private rangeContains(
    range: { x: number; y: number; width: number; height: number },
    point: PatternNode
  ): boolean {
    return (
      point.x >= range.x &&
      point.x < range.x + range.width &&
      point.y >= range.y &&
      point.y < range.y + range.height
    );
  }
}
