package web.models;
import java.util.Objects;
import static java.lang.Math.abs;

public class Point {
    private final double x;
    private final double y;
    private final int r;
    private final boolean res;

    public Point(double x, double y, int r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.res = Valid(x, y, r);
    }
    private boolean Valid(double x, double y, double r) {
        if (0 <= x && 0 <= y && ((x * x + y * y) <= (r * r/4))) {return true;}
        if (-r <= x && x <= 0 && 0 <= y  && y <= r) {return true;}
        if (0 <= x && y <= 0 && x/2-r/2<=y  ) {return true;}
        return false;
    }
    public double getX() {
        return x;
    }
    public double getY() {
        return y;
    }
    public int getR() {
        return r;
    }
    public boolean isInArea() {
        return res;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Point point = (Point) o;
        return x == point.x && Double.compare(y, point.y) == 0 && r == point.r;
    }

    @Override
    public String toString() {
        String l="Point{" + "x=" + x + ", y=" + y + ", r=" + r + ", isInArea=" + res + '}';
        return l;
    }
}