import React, { useMemo } from "react";
import { Product } from "./Card";
import { Container, Row, Col } from "reactstrap";
import { StaggeredText } from "./Animations";
import { ProductGridSkeleton } from "./LoadingComponent";
import "./card.css";

function NewArr({ clothes }) {
  const { items, isRecent } = useMemo(() => {
    if (!Array.isArray(clothes?.clothes)) return { items: [], isRecent: true };

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const allItems = clothes.clothes.flatMap((category) =>
      (category.items || []).map((cloth) => ({
        category: category.category,
        cloth,
      }))
    );

    const recentItems = allItems
      .filter(({ cloth }) => cloth.createdAt && new Date(cloth.createdAt) >= oneMonthAgo)
      .slice(0, 8);

    if (recentItems.length > 0) {
      return { items: recentItems, isRecent: true };
    }

    const latestReleases = [...allItems]
      .sort((a, b) => new Date(b.cloth.createdAt || 0) - new Date(a.cloth.createdAt || 0))
      .slice(0, 4);

    return { items: latestReleases, isRecent: false };
  }, [clothes]);

  return (
    <section
      id="casestu"
      style={{
        padding: "clamp(3.2rem, 6vw, 5.5rem) 0",
      }}
    >
      <Container style={{ maxWidth: "1360px" }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end mb-4 pb-2">
          <div>
            <span className="eyebrow-label mb-2">
              {isRecent ? "Just Landed" : "Recent Atelier Drops"}
            </span>
            <h2 className="section-heading">
              <StaggeredText text="New Arrivals" />
            </h2>
          </div>
          <p className="section-subcopy mt-2 mt-md-0 mb-0">
            Fresh silhouettes and fine-weave releases curated for the season.
          </p>
        </div>

        {clothes.isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : items.length > 0 ? (
          <Row className="g-3 g-md-4">
            {items.map((item, index) => (
              <Col
                key={item.cloth._id || index}
                lg={3}
                md={4}
                xs={6}
                className="mb-4 d-flex flex-column"
              >
                <Product category={item.category} child={item.cloth} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5 text-muted">
            New seasonal pieces arriving shortly.
          </div>
        )}
      </Container>
    </section>
  );
}

export default NewArr;
